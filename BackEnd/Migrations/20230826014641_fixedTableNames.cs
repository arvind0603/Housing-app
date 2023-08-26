using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class fixedTableNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_properties_PropertyId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_Cities_CityId",
                table: "properties");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_furnishingTypes_FurnishingTypeId",
                table: "properties");

            migrationBuilder.DropForeignKey(
                name: "FK_properties_propertyTypes_PropertyTypeId",
                table: "properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_propertyTypes",
                table: "propertyTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_properties",
                table: "properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_furnishingTypes",
                table: "furnishingTypes");

            migrationBuilder.RenameTable(
                name: "propertyTypes",
                newName: "PropertyTypes");

            migrationBuilder.RenameTable(
                name: "properties",
                newName: "Properties");

            migrationBuilder.RenameTable(
                name: "furnishingTypes",
                newName: "PurnishingTypes");

            migrationBuilder.RenameIndex(
                name: "IX_properties_PropertyTypeId",
                table: "Properties",
                newName: "IX_Properties_PropertyTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_properties_FurnishingTypeId",
                table: "Properties",
                newName: "IX_Properties_FurnishingTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_properties_CityId",
                table: "Properties",
                newName: "IX_Properties_CityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PropertyTypes",
                table: "PropertyTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurnishingTypes",
                table: "PurnishingTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Properties_PropertyId",
                table: "Photos",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Cities_CityId",
                table: "Properties",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_PropertyTypes_PropertyTypeId",
                table: "Properties",
                column: "PropertyTypeId",
                principalTable: "PropertyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_PurnishingTypes_FurnishingTypeId",
                table: "Properties",
                column: "FurnishingTypeId",
                principalTable: "PurnishingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Properties_PropertyId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Cities_CityId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_PropertyTypes_PropertyTypeId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_PurnishingTypes_FurnishingTypeId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PropertyTypes",
                table: "PropertyTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurnishingTypes",
                table: "PurnishingTypes");

            migrationBuilder.RenameTable(
                name: "PropertyTypes",
                newName: "propertyTypes");

            migrationBuilder.RenameTable(
                name: "Properties",
                newName: "properties");

            migrationBuilder.RenameTable(
                name: "PurnishingTypes",
                newName: "furnishingTypes");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_PropertyTypeId",
                table: "properties",
                newName: "IX_properties_PropertyTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_FurnishingTypeId",
                table: "properties",
                newName: "IX_properties_FurnishingTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_CityId",
                table: "properties",
                newName: "IX_properties_CityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_propertyTypes",
                table: "propertyTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_properties",
                table: "properties",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_furnishingTypes",
                table: "furnishingTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_properties_PropertyId",
                table: "Photos",
                column: "PropertyId",
                principalTable: "properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_Cities_CityId",
                table: "properties",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_furnishingTypes_FurnishingTypeId",
                table: "properties",
                column: "FurnishingTypeId",
                principalTable: "furnishingTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_properties_propertyTypes_PropertyTypeId",
                table: "properties",
                column: "PropertyTypeId",
                principalTable: "propertyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
