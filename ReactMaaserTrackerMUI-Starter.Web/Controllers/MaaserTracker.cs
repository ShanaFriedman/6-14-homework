using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTracker.Data;
using ReactMaaserTrackerMUI_Starter.Web.ViewModels;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserTracker : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserTracker(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getsources")]
        public List<Source> GetSources()
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            return repo.GetSources();
        }
        [HttpPost]
        [Route("addsource")]
        public void AddSource (Source s)
        {
            if(s.Name == null)
            {
                return;
            }

            var repo = new MaaserTrackerRepository(_connectionString);
            repo.AddSource(s);
        }
        [HttpPost]
        [Route("editsource")]
        public void EditSource(Source selectedSource)
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            repo.UpdateSource(selectedSource);
        }
        [HttpPost]
        [Route("deletesource")]
        public void DeleteSource(Source s)
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            repo.DeleleSource(s);
        }
        [HttpPost]
        [Route("addmaaser")]
        public void AddMaaser(Maaser m)
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            repo.AddMaaser(m);
        }
        [HttpPost]
        [Route("addincome")]
        public void AddMaaser(Income i)
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            repo.AddIncome(i);
        }
        [HttpGet]
        [Route("getmaaser")]
        public List<Maaser> GetMaaser()
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            return repo.GetMaaser();
        }
        [HttpGet]
        [Route("getoverview")]
        public OverveiwViewModel GetOverveiw()
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            return new OverveiwViewModel
            {
                TotalIncome = repo.GetTotalIncome(),
                TotalMaaser = repo.GetTotalMaaser()
            };
        }
        [HttpGet]
        [Route("getincomes")]
        public List<Source> GetIncomes()
        {
            var repo = new MaaserTrackerRepository(_connectionString);
            return repo.GetSourcesWithIncomes();
            //return sources;
        }
    }
}
