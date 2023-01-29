using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AddressBook.Migrations
{
    /// <inheritdoc />
    public partial class personrenamecontact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Person");

            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    ContactId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.ContactId);
                });

            migrationBuilder.CreateTable(
                name: "ContactAddress",
                columns: table => new
                {
                    ContactAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Line1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Line2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: true),
                    AddressLabelId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactAddress", x => x.ContactAddressId);
                    table.ForeignKey(
                        name: "FK_ContactAddress_AddressLabel_AddressLabelId",
                        column: x => x.AddressLabelId,
                        principalTable: "AddressLabel",
                        principalColumn: "AddressLabelId");
                    table.ForeignKey(
                        name: "FK_ContactAddress_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "CityId");
                    table.ForeignKey(
                        name: "FK_ContactAddress_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                });

            migrationBuilder.CreateTable(
                name: "ContactChat",
                columns: table => new
                {
                    ContactChatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Chat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    ChatLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactChat", x => x.ContactChatId);
                    table.ForeignKey(
                        name: "FK_ContactChat_ChatLabel_ChatLabelId",
                        column: x => x.ChatLabelId,
                        principalTable: "ChatLabel",
                        principalColumn: "ChatLabelId");
                    table.ForeignKey(
                        name: "FK_ContactChat_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                });

            migrationBuilder.CreateTable(
                name: "ContactEmail",
                columns: table => new
                {
                    ContactEmailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    EmailLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactEmail", x => x.ContactEmailId);
                    table.ForeignKey(
                        name: "FK_ContactEmail_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                    table.ForeignKey(
                        name: "FK_ContactEmail_EmailLabel_EmailLabelId",
                        column: x => x.EmailLabelId,
                        principalTable: "EmailLabel",
                        principalColumn: "EmailLabelId");
                });

            migrationBuilder.CreateTable(
                name: "ContactLabel",
                columns: table => new
                {
                    ContactLabelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    LabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactLabel", x => x.ContactLabelId);
                    table.ForeignKey(
                        name: "FK_ContactLabel_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                    table.ForeignKey(
                        name: "FK_ContactLabel_Label_LabelId",
                        column: x => x.LabelId,
                        principalTable: "Label",
                        principalColumn: "LabelId");
                });

            migrationBuilder.CreateTable(
                name: "ContactPhone",
                columns: table => new
                {
                    ContactPhoneId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    PhoneLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactPhone", x => x.ContactPhoneId);
                    table.ForeignKey(
                        name: "FK_ContactPhone_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                    table.ForeignKey(
                        name: "FK_ContactPhone_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "CountryId");
                    table.ForeignKey(
                        name: "FK_ContactPhone_PhoneLabel_PhoneLabelId",
                        column: x => x.PhoneLabelId,
                        principalTable: "PhoneLabel",
                        principalColumn: "PhoneLabelId");
                });

            migrationBuilder.CreateTable(
                name: "ContactWebsite",
                columns: table => new
                {
                    ContactWebsiteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    WebsiteLabelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactWebsite", x => x.ContactWebsiteId);
                    table.ForeignKey(
                        name: "FK_ContactWebsite_Contact_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contact",
                        principalColumn: "ContactId");
                    table.ForeignKey(
                        name: "FK_ContactWebsite_WebsiteLabel_WebsiteLabelId",
                        column: x => x.WebsiteLabelId,
                        principalTable: "WebsiteLabel",
                        principalColumn: "WebsiteLabelId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactAddress_AddressLabelId",
                table: "ContactAddress",
                column: "AddressLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactAddress_CityId",
                table: "ContactAddress",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactAddress_ContactId",
                table: "ContactAddress",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactChat_ChatLabelId",
                table: "ContactChat",
                column: "ChatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactChat_ContactId",
                table: "ContactChat",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactEmail_ContactId",
                table: "ContactEmail",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactEmail_EmailLabelId",
                table: "ContactEmail",
                column: "EmailLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactLabel_ContactId",
                table: "ContactLabel",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactLabel_LabelId",
                table: "ContactLabel",
                column: "LabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactPhone_ContactId",
                table: "ContactPhone",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactPhone_CountryId",
                table: "ContactPhone",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactPhone_PhoneLabelId",
                table: "ContactPhone",
                column: "PhoneLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactWebsite_ContactId",
                table: "ContactWebsite",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactWebsite_WebsiteLabelId",
                table: "ContactWebsite",
                column: "WebsiteLabelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactAddress");

            migrationBuilder.DropTable(
                name: "ContactChat");

            migrationBuilder.DropTable(
                name: "ContactEmail");

            migrationBuilder.DropTable(
                name: "ContactLabel");

            migrationBuilder.DropTable(
                name: "ContactPhone");

            migrationBuilder.DropTable(
                name: "ContactWebsite");

            migrationBuilder.DropTable(
                name: "Contact");

            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    PersonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.PersonId);
                });

            migrationBuilder.CreateTable(
                name: "PersonAddress",
                columns: table => new
                {
                    PersonAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressLabelId = table.Column<int>(type: "int", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    Line1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Line2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    ChatLabelId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    Chat = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    EmailLabelId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    LabelId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonLabel", x => x.PersonLabelId);
                    table.ForeignKey(
                        name: "FK_PersonLabel_Label_LabelId",
                        column: x => x.LabelId,
                        principalTable: "Label",
                        principalColumn: "LabelId");
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
                    CountryId = table.Column<int>(type: "int", nullable: true),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    PhoneLabelId = table.Column<int>(type: "int", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    WebsiteLabelId = table.Column<int>(type: "int", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                name: "IX_PersonLabel_LabelId",
                table: "PersonLabel",
                column: "LabelId");

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
    }
}
