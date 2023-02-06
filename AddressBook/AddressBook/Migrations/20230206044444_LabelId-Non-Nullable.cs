using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class LabelIdNonNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactLabel_Label_LabelId",
                table: "ContactLabel");

            migrationBuilder.AlterColumn<int>(
                name: "LabelId",
                table: "ContactLabel",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactLabel_Label_LabelId",
                table: "ContactLabel",
                column: "LabelId",
                principalTable: "Label",
                principalColumn: "LabelId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactLabel_Label_LabelId",
                table: "ContactLabel");

            migrationBuilder.AlterColumn<int>(
                name: "LabelId",
                table: "ContactLabel",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactLabel_Label_LabelId",
                table: "ContactLabel",
                column: "LabelId",
                principalTable: "Label",
                principalColumn: "LabelId");
        }
    }
}
