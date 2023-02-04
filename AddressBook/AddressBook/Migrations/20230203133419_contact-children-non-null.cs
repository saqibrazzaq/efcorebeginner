using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class contactchildrennonnull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactAddress_Contact_ContactId",
                table: "ContactAddress");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactChat_Contact_ContactId",
                table: "ContactChat");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactEmail_Contact_ContactId",
                table: "ContactEmail");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactLabel_Contact_ContactId",
                table: "ContactLabel");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactPhone_Contact_ContactId",
                table: "ContactPhone");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactWebsite_Contact_ContactId",
                table: "ContactWebsite");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactWebsite",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactPhone",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactLabel",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactEmail",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactChat",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactAddress",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactAddress_Contact_ContactId",
                table: "ContactAddress",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactChat_Contact_ContactId",
                table: "ContactChat",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactEmail_Contact_ContactId",
                table: "ContactEmail",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactLabel_Contact_ContactId",
                table: "ContactLabel",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactPhone_Contact_ContactId",
                table: "ContactPhone",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactWebsite_Contact_ContactId",
                table: "ContactWebsite",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactAddress_Contact_ContactId",
                table: "ContactAddress");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactChat_Contact_ContactId",
                table: "ContactChat");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactEmail_Contact_ContactId",
                table: "ContactEmail");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactLabel_Contact_ContactId",
                table: "ContactLabel");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactPhone_Contact_ContactId",
                table: "ContactPhone");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactWebsite_Contact_ContactId",
                table: "ContactWebsite");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactWebsite",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactPhone",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactLabel",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactEmail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactChat",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ContactId",
                table: "ContactAddress",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactAddress_Contact_ContactId",
                table: "ContactAddress",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactChat_Contact_ContactId",
                table: "ContactChat",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactEmail_Contact_ContactId",
                table: "ContactEmail",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactLabel_Contact_ContactId",
                table: "ContactLabel",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactPhone_Contact_ContactId",
                table: "ContactPhone",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactWebsite_Contact_ContactId",
                table: "ContactWebsite",
                column: "ContactId",
                principalTable: "Contact",
                principalColumn: "ContactId");
        }
    }
}
