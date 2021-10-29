﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("API.Entities.CustomerUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.ToTable("CustomerUsers");
                });

            modelBuilder.Entity("API.Entities.Listing", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("BathFull")
                        .HasColumnType("int");

                    b.Property<int>("BathTotals")
                        .HasColumnType("int");

                    b.Property<int>("BathsHalf")
                        .HasColumnType("int");

                    b.Property<int>("Bedrooms")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Community")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("County")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DaysOnMarket")
                        .HasColumnType("int");

                    b.Property<string>("DiningRoomDimensions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ElementarySchool")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EstimatedSquareFeet")
                        .HasColumnType("int");

                    b.Property<string>("FullAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HighSchool")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HomeOwnerFees")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KitchenDimensions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ListingDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ListingPictures")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LivingRoomDimensions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LotSize")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MLS")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MasterBedroomDimensions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MiddleSchool")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PriceSearch")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WalkScore")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WaterDistrict")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WaterDistrictURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("YearBuilt")
                        .HasColumnType("int");

                    b.Property<int>("zip")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Listings");
                });
#pragma warning restore 612, 618
        }
    }
}
