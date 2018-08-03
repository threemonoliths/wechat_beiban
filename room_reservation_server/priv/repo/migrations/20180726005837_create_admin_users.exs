defmodule RoomReservationServer.Repo.Migrations.CreateAdminUsers do
  use Ecto.Migration

  def change do
    create table(:admin_users) do
      add :name, :string, null: false
      add :password_hash, :string, null: false
      timestamps()
    end

    create unique_index(:admin_users, [:name])

  end
end
