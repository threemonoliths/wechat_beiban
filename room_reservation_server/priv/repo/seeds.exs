# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     RoomReservationServer.Repo.insert!(%RoomReservationServer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias RoomReservationServer.Repo
alias RoomReservationServer.AdminUserContext.AdminUser


%AdminUser{}
|> AdminUser.changeset(%{
  name: "admin"
})
|> Repo.insert()