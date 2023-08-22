using BackEnd.Data;
using BackEnd.Helpers;
using BackEnd.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            // using Microsoft.EntityFrameworkCore;
            services.AddDbContext<BackEnd.Data.DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConn")));
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}