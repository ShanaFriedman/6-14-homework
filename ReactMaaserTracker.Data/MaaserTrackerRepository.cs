using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class MaaserTrackerRepository
    {
        private readonly string _connectionString;
        public MaaserTrackerRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddSource(Source s)
        {
            var context = new MaaserDbContext(_connectionString);
            context.Sources.Add(s);
            context.SaveChanges();
        }
        public List<Source> GetSources()
        {
            var context = new MaaserDbContext(_connectionString);
            return context.Sources.ToList();
        }
        public void UpdateSource(Source s)
        {
            var context = new MaaserDbContext(_connectionString);
            context.Sources.Update(s);
            context.SaveChanges();
        }
        public void DeleleSource(Source s)
        {
            var context = new MaaserDbContext(_connectionString);
            context.Sources.Remove(s);
            context.SaveChanges();
        }
        public List<Source> GetSourcesWithIncomes()
        {
            var context = new MaaserDbContext(_connectionString);
            return context.Sources.Where(s => s.Incomes.Count > 0).Include(s => s.Incomes).ToList();
        }
        public void AddIncome(Income i)
        {
            var context = new MaaserDbContext(_connectionString);
            context.Incomes.Add(i);
            context.SaveChanges();
        }
        //public List<Income> GetIncomes()
        //{
        //    var context = new MaaserDbContext(_connectionString);
        //    return context.Incomes.Include(i => i.Source).ToList();
        //}
        public void AddMaaser(Maaser m)
        {
            var context = new MaaserDbContext(_connectionString);
            context.Maaser.Add(m);
            context.SaveChanges();
        }
        public List<Maaser> GetMaaser()
        {
            var context = new MaaserDbContext(_connectionString);
            return context.Maaser.ToList();
        }
        public int GetTotalIncome()
        {
            var context = new MaaserDbContext(_connectionString);
            return context.Incomes.Sum(i => i.Amount);
        }
        public int GetTotalMaaser()
        {
            var context = new MaaserDbContext(_connectionString);
            return context.Maaser.Sum(m => m.Amount);
        }
    }
}
