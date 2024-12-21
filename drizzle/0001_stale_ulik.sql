PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "name", "email", "description") SELECT "id", "name", "email", "description" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);