using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class fixedTableNameFurnishingTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_PurnishingTypes_FurnishingTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurnishingTypes",
                table: "PurnishingTypes");

            migrationBuilder.RenameTable(
                name: "PurnishingTypes",
                newName: "FurnishingTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FurnishingTypes",
                table: "FurnishingTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_FurnishingTypes_FurnishingTypeId",
                table: "Properties",
                column: "FurnishingTypeId",
                principalTable: "FurnishingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_FurnishingTypes_FurnishingTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FurnishingTypes",
                table: "FurnishingTypes");

            migrationBuilder.RenameTable(
                name: "FurnishingTypes",
                newName: "PurnishingTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurnishingTypes",
                table: "PurnishingTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_PurnishingTypes_FurnishingTypeId",
                table: "Properties",
                column: "FurnishingTypeId",
                principalTable: "PurnishingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
