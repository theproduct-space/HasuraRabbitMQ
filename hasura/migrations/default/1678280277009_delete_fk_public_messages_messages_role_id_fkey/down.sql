alter table "public"."messages"
  add constraint "messages_role_id_fkey"
  foreign key ("role_id")
  references "public"."roles"
  ("id") on update restrict on delete restrict;
