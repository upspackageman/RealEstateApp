using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class Index_Price : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Listings_Id",
                table: "Listings");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_PriceSearch",
                table: "Listings",
                column: "PriceSearch");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Listings_PriceSearch",
                table: "Listings");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_Id",
                table: "Listings",
                column: "Id",
                unique: true);
        }
    }
}
