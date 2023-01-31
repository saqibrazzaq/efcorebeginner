using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class cloudinaryid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CloudinaryId",
                table: "Contact",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloudinaryId",
                table: "Contact");
        }
    }
}
