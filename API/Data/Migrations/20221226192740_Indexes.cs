using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Indexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Index_Id",
                table: "Listings");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_Id",
                table: "Listings",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Listings_Id",
                table: "Listings");

            migrationBuilder.CreateIndex(
                name: "Index_Id",
                table: "Listings",
                column: "Id");
        }
    }
}
