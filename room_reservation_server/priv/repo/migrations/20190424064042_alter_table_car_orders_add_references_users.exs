defmodule RoomReservationServer.Repo.Migrations.AlterTableCarOrdersAddReferencesUsers do
  use Ecto.Migration

  def change do
    alter table(:car_orders) do
      add :user_id, references(:users)
    end
  end
end
