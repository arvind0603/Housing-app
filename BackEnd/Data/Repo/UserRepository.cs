using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<User> Authentication(string username, string passwordText)
        {
            var user = await dc.Users.FirstOrDefaultAsync(u => u.Username == username); 

            if (user == null || user.PasswordKey == null)
            {
                return null;
            }

            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey)){
                return null;
            }

            return user;

        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i]!= password[i]){
                        return false;
                    }
                }
                return true;
            }
        }

        void IUserRepository.Register(string username, string password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User(){
                Username = username,
                Password = passwordHash,
                PasswordKey = passwordKey
            };

            dc.Users.Add(user);
        }

        async Task<bool> IUserRepository.UserAlreadyExists(string username)
        {
            return await dc.Users.AnyAsync(u => u.Username == username);
        }
    }
}