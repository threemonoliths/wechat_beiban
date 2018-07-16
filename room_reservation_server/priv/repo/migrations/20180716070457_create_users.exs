defmodule RoomReservationServer.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :open_id, :string, null: false
      add :name, :string
      add :mobile, :string, null: false
      add :company, :string
      timestamps()
    end

    create unique_index(:users, [:open_id])
    create unique_index(:users, [:mobile])

  end
end
