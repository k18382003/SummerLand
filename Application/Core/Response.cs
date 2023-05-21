using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Response<T>
    {
        public bool IsSuccess { get; set; }

        public T Value { get; set; }

        public string ErrorMsg { get; set; }

        public static Response<T> Success(T value) => new Response<T> { IsSuccess = true, Value = value };

        public static Response<T> Failure(string error) => new Response<T> { IsSuccess = false, ErrorMsg = error };
    }
}
