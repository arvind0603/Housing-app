using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dataContext;
        public CityRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        public void AddCity(City city)
        {
            dataContext.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = dataContext.Cities.Find(cityId);
            dataContext.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dataContext.Cities.ToListAsync();
        }

        public async Task<City> FindCity(int id)
        {
            return await dataContext.Cities.FindAsync(id);
        }
    }
}