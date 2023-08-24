using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;

namespace BackEnd.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authentication(string username, string password);
        void Register(string username, string password);
        Task<bool> UserAlreadyExists(string username);
    }
}