defmodule RoomReservationServer.Repo.Migrations.CreateRoomOrderInfo do
  use Ecto.Migration

  def change do
    create table(:room_order_info) do
      add :user_id, :string
      add :start_time, :date
      add :end_time, :date
      add :comment, :text
      add :status, :boolean

      add :room_id, references(:rooms)
      timestamps()
    end

  end
end
