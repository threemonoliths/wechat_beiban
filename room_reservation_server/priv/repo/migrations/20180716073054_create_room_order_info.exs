defmodule RoomReservationServer.Repo.Migrations.CreateRoomOrderInfo do
  use Ecto.Migration

  def change do
    create table(:room_order_info) do
      add :user_id, :string
      add :start_time, :date
      add :end_time, :date
      add :room_quantity, :integer
      add :comment, :text
      add :status, :boolean

      add :room_layout_id, references(:room_layouts)
      timestamps()
    end

  end
end
