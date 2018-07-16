defmodule RoomReservationServer.Repo.Migrations.CreateDicts do
  use Ecto.Migration

  def change do
    create table(:dicts) do
      add :type, :string, null: false
      add :key, :string, null: false
      add :value, :string, null: false

      timestamps()
    end

  end
end
