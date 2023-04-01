using AddressBook.Data;
using Queries.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Queries
{
    public class MyApplication
    {
        private readonly OneTable _oneTable;

        public MyApplication(OneTable oneTable)
        {
            _oneTable = oneTable;
        }

        internal async Task Run()
        {
            RunOneTable();
        }

        private void RunOneTable()
        {
            //_oneTable.SelectAll();
            _oneTable.SelectAllSort();
        }
    }
}
