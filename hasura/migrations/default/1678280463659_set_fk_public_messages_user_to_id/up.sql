alter table "public"."messages"
  add constraint "messages_user_to_id_fkey"
  foreign key ("user_to_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
