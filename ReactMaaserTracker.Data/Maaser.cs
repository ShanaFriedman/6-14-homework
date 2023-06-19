using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
