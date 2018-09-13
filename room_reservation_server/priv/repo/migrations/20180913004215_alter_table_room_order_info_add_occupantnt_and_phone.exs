defmodule RoomReservationServer.Repo.Migrations.AlterTableRoomOrderInfoAddOccupantntAndPhone do
  use Ecto.Migration

  def change do
    alter table(:room_order_info) do
      add :occupant, :string
      add :phone, :string
    end
  end
end
