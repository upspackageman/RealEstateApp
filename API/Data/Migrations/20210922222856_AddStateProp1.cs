using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class AddStateProp1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MLS = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BathTotals = table.Column<int>(type: "int", nullable: false),
                    BathFull = table.Column<int>(type: "int", nullable: false),
                    BathsHalf = table.Column<int>(type: "int", nullable: false),
                    Bedrooms = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    County = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiningRoomDimensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeOwnerFees = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LotSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MasterBedroomDimensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Neighborhood = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaterDistrict = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaterDistrictURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    zip = table.Column<int>(type: "int", nullable: false),
                    WalkScore = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearBuilt = table.Column<int>(type: "int", nullable: false),
                    LivingRoomDimensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KitchenDimensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DaysOnMarket = table.Column<int>(type: "int", nullable: false),
                    ListingPictures = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedSquareFeet = table.Column<int>(type: "int", nullable: false),
                    HighSchool = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElementarySchool = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleSchool = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ListingDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Community = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriceSearch = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerUsers");

            migrationBuilder.DropTable(
                name: "Listings");
        }
    }
}
