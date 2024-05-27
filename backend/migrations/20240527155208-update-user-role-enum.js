'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Get the current ENUM values
    const queryInterfaceQuery = `SELECT "pg_enum"."enumlabel" AS "value" FROM "pg_enum" INNER JOIN "pg_type" ON "pg_type"."oid" = "pg_enum"."enumtypid" INNER JOIN "pg_catalog"."pg_namespace" ON "pg_namespace"."oid" = "pg_type"."typnamespace" WHERE "pg_type"."typname" = 'enum_Users_role';`;
    const roles = await queryInterface.sequelize.query(queryInterfaceQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const roleValues = roles.map(role => role.value);

    // Add new value to ENUM
    if (!roleValues.includes('admin')) {
      await queryInterface.sequelize.query('ALTER TYPE "enum_Users_role" ADD VALUE \'admin\'');
    }
  },

  down: async (queryInterface, Sequelize) => {
   

    // Rename the existing ENUM type
    await queryInterface.sequelize.query('ALTER TYPE "enum_Users_role" RENAME TO "enum_Users_role_old"');

    // Create a new ENUM type without the 'admin' value
    await queryInterface.sequelize.query('CREATE TYPE "enum_Users_role" AS ENUM(\'vendor\', \'buying_house\')');

    // Update the columns to use the new ENUM type
    await queryInterface.sequelize.query('ALTER TABLE "Users" ALTER COLUMN "role" TYPE "enum_Users_role" USING "role"::text::"enum_Users_role"');

    // Drop the old ENUM type
    await queryInterface.sequelize.query('DROP TYPE "enum_Users_role_old"');
  }
};
