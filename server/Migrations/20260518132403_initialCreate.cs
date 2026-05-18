using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomLocations", x => x.Id);
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
                    RoomLocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registereds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Registereds_RoomLocations_RoomLocationId",
                        column: x => x.RoomLocationId,
                        principalTable: "RoomLocations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoomsDBs",
                columns: table => new
                {
                    RoomNum = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Floor = table.Column<int>(type: "int", nullable: false),
                    OnSea = table.Column<bool>(type: "bit", nullable: false),
                    Extrta = table.Column<bool>(type: "bit", nullable: false),
                    Occupied = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoomLocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomsDBs", x => x.RoomNum);
                    table.ForeignKey(
                        name: "FK_RoomsDBs_RoomLocations_RoomLocationId",
                        column: x => x.RoomLocationId,
                        principalTable: "RoomLocations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Option = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    RegisteredsId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conditions_Registereds_RegisteredsId",
                        column: x => x.RegisteredsId,
                        principalTable: "Registereds",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PricesLists",
                columns: table => new
                {
                    IdPrice = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Event = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RegisteredsId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricesLists", x => x.IdPrice);
                    table.ForeignKey(
                        name: "FK_PricesLists_Registereds_RegisteredsId",
                        column: x => x.RegisteredsId,
                        principalTable: "Registereds",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_RegisteredsId",
                table: "Conditions",
                column: "RegisteredsId");

            migrationBuilder.CreateIndex(
                name: "IX_PricesLists_RegisteredsId",
                table: "PricesLists",
                column: "RegisteredsId");

            migrationBuilder.CreateIndex(
                name: "IX_Registereds_RoomLocationId",
                table: "Registereds",
                column: "RoomLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomsDBs_RoomLocationId",
                table: "RoomsDBs",
                column: "RoomLocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Conditions");

            migrationBuilder.DropTable(
                name: "PricesLists");

            migrationBuilder.DropTable(
                name: "RoomsDBs");

            migrationBuilder.DropTable(
                name: "Registereds");

            migrationBuilder.DropTable(
                name: "RoomLocations");
        }
    }
}
