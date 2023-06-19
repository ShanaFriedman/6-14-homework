using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class MaaserContextFactory : IDesignTimeDbContextFactory<MaaserDbContext>
    {
        public MaaserDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactMaaserTrackerMUI-Starter.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new MaaserDbContext(config.GetConnectionString("ConStr"));
        }

    }
}
