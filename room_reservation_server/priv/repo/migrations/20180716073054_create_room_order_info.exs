defmodule RoomReservationServer.Repo.Migrations.CreateRoomOrderInfo do
  use Ecto.Migration

  def change do
    create table(:room_order_info) do
      
      add :start_time, :date
      add :days, :integer
      add :rooms, :integer
      add :comment, :text
      add :status, :boolean

      add :user_id, references(:users)
      add :layout_id, references(:room_layouts)
      timestamps()
    end

  end
end
