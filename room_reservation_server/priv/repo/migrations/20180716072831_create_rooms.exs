defmodule RoomReservationServer.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :room_number, :string
      add :desc, :string
      add :layout_id, references(:layouts)
      timestamps()
    end

  end
end
