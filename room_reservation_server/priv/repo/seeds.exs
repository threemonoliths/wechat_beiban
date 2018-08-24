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
alias RoomReservationServer.Accounts.User


%AdminUser{}
|> AdminUser.changeset(%{
  name: "admin"
})
|> Repo.insert()

%User{}
|> User.changeset(%{
  open_id: "weixin000001",
  name: "王磊",
  mobile: "15156709660"
})
|> Repo.insert()