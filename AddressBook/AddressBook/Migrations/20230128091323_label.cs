using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class label : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "PersonLabel");

            migrationBuilder.AddColumn<int>(
                name: "LabelId",
                table: "PersonLabel",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Label",
                columns: table => new
                {
                    LabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Label", x => x.LabelId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonLabel_LabelId",
                table: "PersonLabel",
                column: "LabelId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonLabel_Label_LabelId",
                table: "PersonLabel",
                column: "LabelId",
                principalTable: "Label",
                principalColumn: "LabelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonLabel_Label_LabelId",
                table: "PersonLabel");

            migrationBuilder.DropTable(
                name: "Label");

            migrationBuilder.DropIndex(
                name: "IX_PersonLabel_LabelId",
                table: "PersonLabel");

            migrationBuilder.DropColumn(
                name: "LabelId",
                table: "PersonLabel");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "PersonLabel",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }
    }
}
