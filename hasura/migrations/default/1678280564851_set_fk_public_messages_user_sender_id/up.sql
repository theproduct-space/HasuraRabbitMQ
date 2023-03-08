alter table "public"."messages"
  add constraint "messages_user_sender_id_fkey"
  foreign key ("user_sender_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
