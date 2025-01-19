ALTER TABLE `users_table` RENAME TO `contacts_table`;--> statement-breakpoint
DROP INDEX `users_table_email_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `contacts_table_email_unique` ON `contacts_table` (`email`);