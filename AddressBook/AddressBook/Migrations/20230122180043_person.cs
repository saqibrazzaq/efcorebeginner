using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class person : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AddressLabel",
                columns: table => new
                {
                    AddressLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressLabel", x => x.AddressLabelId);
                });

            migrationBuilder.CreateTable(
                name: "ChatLabel",
                columns: table => new
                {
                    ChatLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatLabel", x => x.ChatLabelId);
                });

            migrationBuilder.CreateTable(
                name: "EmailLabel",
                columns: table => new
                {
                    EmailLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailLabel", x => x.EmailLabelId);
                });

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    PersonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.PersonId);
                });

            migrationBuilder.CreateTable(
                name: "PhoneLabel",
                columns: table => new
                {
                    PhoneLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneLabel", x => x.PhoneLabelId);
                });

            migrationBuilder.CreateTable(
                name: "WebsiteLabel",
                columns: table => new
                {
                    WebsiteLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebsiteLabel", x => x.WebsiteLabelId);
                });

            migrationBuilder.CreateTable(
                name: "PersonAddress",
                columns: table => new
                {
                    PersonAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Line1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Line2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: true),
                    AddressLabelId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonAddress", x => x.PersonAddressId);
                    table.ForeignKey(
                        name: "FK_PersonAddress_AddressLabel_AddressLabelId",
                        column: x => x.AddressLabelId,
                        principalTable: "AddressLabel",
                        principalColumn: "AddressLabelId");
                    table.ForeignKey(
                        name: "FK_PersonAddress_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "CityId");
                    table.ForeignKey(
                        name: "FK_PersonAddress_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "PersonChat",
                columns: table => new
                {
                    PersonChatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Chat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    ChatLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonChat", x => x.PersonChatId);
                    table.ForeignKey(
                        name: "FK_PersonChat_ChatLabel_ChatLabelId",
                        column: x => x.ChatLabelId,
                        principalTable: "ChatLabel",
                        principalColumn: "ChatLabelId");
                    table.ForeignKey(
                        name: "FK_PersonChat_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "PersonEmail",
                columns: table => new
                {
                    PersonEmailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    EmailLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonEmail", x => x.PersonEmailId);
                    table.ForeignKey(
                        name: "FK_PersonEmail_EmailLabel_EmailLabelId",
                        column: x => x.EmailLabelId,
                        principalTable: "EmailLabel",
                        principalColumn: "EmailLabelId");
                    table.ForeignKey(
                        name: "FK_PersonEmail_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "PersonLabel",
                columns: table => new
                {
                    PersonLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonLabel", x => x.PersonLabelId);
                    table.ForeignKey(
                        name: "FK_PersonLabel_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                });

            migrationBuilder.CreateTable(
                name: "PersonPhone",
                columns: table => new
                {
                    PersonPhoneId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    PhoneLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonPhone", x => x.PersonPhoneId);
                    table.ForeignKey(
                        name: "FK_PersonPhone_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "CountryId");
                    table.ForeignKey(
                        name: "FK_PersonPhone_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                    table.ForeignKey(
                        name: "FK_PersonPhone_PhoneLabel_PhoneLabelId",
                        column: x => x.PhoneLabelId,
                        principalTable: "PhoneLabel",
                        principalColumn: "PhoneLabelId");
                });

            migrationBuilder.CreateTable(
                name: "PersonWebsite",
                columns: table => new
                {
                    PersonWebsiteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    WebsiteLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonWebsite", x => x.PersonWebsiteId);
                    table.ForeignKey(
                        name: "FK_PersonWebsite_Person_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Person",
                        principalColumn: "PersonId");
                    table.ForeignKey(
                        name: "FK_PersonWebsite_WebsiteLabel_WebsiteLabelId",
                        column: x => x.WebsiteLabelId,
                        principalTable: "WebsiteLabel",
                        principalColumn: "WebsiteLabelId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonAddress_AddressLabelId",
                table: "PersonAddress",
                column: "AddressLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonAddress_CityId",
                table: "PersonAddress",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonAddress_PersonId",
                table: "PersonAddress",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonChat_ChatLabelId",
                table: "PersonChat",
                column: "ChatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonChat_PersonId",
                table: "PersonChat",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonEmail_EmailLabelId",
                table: "PersonEmail",
                column: "EmailLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonEmail_PersonId",
                table: "PersonEmail",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonLabel_PersonId",
                table: "PersonLabel",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPhone_CountryId",
                table: "PersonPhone",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPhone_PersonId",
                table: "PersonPhone",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPhone_PhoneLabelId",
                table: "PersonPhone",
                column: "PhoneLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonWebsite_PersonId",
                table: "PersonWebsite",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonWebsite_WebsiteLabelId",
                table: "PersonWebsite",
                column: "WebsiteLabelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonAddress");

            migrationBuilder.DropTable(
                name: "PersonChat");

            migrationBuilder.DropTable(
                name: "PersonEmail");

            migrationBuilder.DropTable(
                name: "PersonLabel");

            migrationBuilder.DropTable(
                name: "PersonPhone");

            migrationBuilder.DropTable(
                name: "PersonWebsite");

            migrationBuilder.DropTable(
                name: "AddressLabel");

            migrationBuilder.DropTable(
                name: "ChatLabel");

            migrationBuilder.DropTable(
                name: "EmailLabel");

            migrationBuilder.DropTable(
                name: "PhoneLabel");

            migrationBuilder.DropTable(
                name: "Person");

            migrationBuilder.DropTable(
                name: "WebsiteLabel");
        }
    }
}
