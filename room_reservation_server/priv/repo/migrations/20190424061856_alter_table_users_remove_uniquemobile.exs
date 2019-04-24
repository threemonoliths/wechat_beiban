defmodule RoomReservationServer.Repo.Migrations.AlterTableUsersRemoveUniquemobile do
  use Ecto.Migration

  def change do
    drop unique_index(:users, [:mobile])
  end
end
