using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Option = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PricesListHistories",
                columns: table => new
                {
                    IdHistory = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPrice = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Event = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricesListHistories", x => x.IdHistory);
                });

            migrationBuilder.CreateTable(
                name: "PricesLists",
                columns: table => new
                {
                    IdPrice = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Event = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricesLists", x => x.IdPrice);
                });

            migrationBuilder.CreateTable(
                name: "RegisteredsHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OriginalRegisteredId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumberId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SumPlace = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    PriceListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredsHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNumber = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomsDBs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomNum = table.Column<int>(type: "int", nullable: false),
                    Floor = table.Column<int>(type: "int", nullable: false),
                    ConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Sumbed = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomsDBs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomsDBs_Conditions_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "Conditions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Registereds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumberId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SumPlace = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    PriceListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registereds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Registereds_Conditions_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "Conditions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Registereds_PricesLists_PriceListId",
                        column: x => x.PriceListId,
                        principalTable: "PricesLists",
                        principalColumn: "IdPrice",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RoomLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rooms = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RegisteredsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomLocations_Registereds_RegisteredsId",
                        column: x => x.RegisteredsId,
                        principalTable: "Registereds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RoomLocations_RoomsDBs_Rooms",
                        column: x => x.Rooms,
                        principalTable: "RoomsDBs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Registereds_ConditionId",
                table: "Registereds",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Registereds_PriceListId",
                table: "Registereds",
                column: "PriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomLocations_RegisteredsId",
                table: "RoomLocations",
                column: "RegisteredsId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomLocations_Rooms",
                table: "RoomLocations",
                column: "Rooms");

            migrationBuilder.CreateIndex(
                name: "IX_RoomsDBs_ConditionId",
                table: "RoomsDBs",
                column: "ConditionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PricesListHistories");

            migrationBuilder.DropTable(
                name: "RegisteredsHistory");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "RoomLocations");

            migrationBuilder.DropTable(
                name: "Registereds");

            migrationBuilder.DropTable(
                name: "RoomsDBs");

            migrationBuilder.DropTable(
                name: "PricesLists");

            migrationBuilder.DropTable(
                name: "Conditions");
        }
    }
}
