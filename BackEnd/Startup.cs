using System.Net;
using System.Text;
using BackEnd.Data;
using BackEnd.Extensions;
using BackEnd.Helpers;
using BackEnd.Interfaces;
using BackEnd.Middlewares;
using BackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // ----- Used local user env variable to store and retrieve DBPassword ----- //
            // var builder = new SqlConnectionStringBuilder(
            //     Configuration.GetConnectionString("DefaultConn"));
            // builder.Password = Configuration.GetSection("DBPassword").Value;
            // var connectionString = builder.ConnectionString;

            var connectionString = Configuration.GetConnectionString("DefaultConn");
            Console.WriteLine(connectionString + "Arvind \n\n");

            // using Microsoft.EntityFrameworkCore;
            services.AddDbContext<BackEnd.Data.DataContext>(options =>
                options.UseSqlServer(connectionString,
                SqlServerOptions => SqlServerOptions.EnableRetryOnFailure()));
            // Configuration.GetConnectionString("Server=ILD-US-LAP-0201\\SQLEXPRESS; Database=Housing; integrated security = true"))


            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(options =>
                {
                    options.AddDefaultPolicy(builder =>
                    {
                        builder.WithOrigins("http://localhost:4200") // Your Angular app's localhost URL
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
                });
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddSingleton<IConfiguration>(Configuration);


            var secretKey = Configuration.GetSection("AppSettings:Key").Value;
            Console.Write(secretKey + " Arvind \n\n");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key
                    };
                }
                );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ConfigureExceptionHandler(env);

            // app.ConfigureBuiltInExceptionHandler(env);

            // app.UseMiddleware<ExceptionMiddleware>();

            app.UseRouting();

            app.UseHsts();
            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}