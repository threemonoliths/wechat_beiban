defmodule RoomReservationServer.AdminUserContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.AdminUserContext

  describe "admin_users" do
    alias RoomReservationServer.AdminUserContext.AdminUser

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def admin_user_fixture(attrs \\ %{}) do
      {:ok, admin_user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> AdminUserContext.create_admin_user()

      admin_user
    end

    test "list_admin_users/0 returns all admin_users" do
      admin_user = admin_user_fixture()
      assert AdminUserContext.list_admin_users() == [admin_user]
    end

    test "get_admin_user!/1 returns the admin_user with given id" do
      admin_user = admin_user_fixture()
      assert AdminUserContext.get_admin_user!(admin_user.id) == admin_user
    end

    test "create_admin_user/1 with valid data creates a admin_user" do
      assert {:ok, %AdminUser{} = admin_user} = AdminUserContext.create_admin_user(@valid_attrs)
      assert admin_user.name == "some name"
    end

    test "create_admin_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = AdminUserContext.create_admin_user(@invalid_attrs)
    end

    test "update_admin_user/2 with valid data updates the admin_user" do
      admin_user = admin_user_fixture()
      assert {:ok, admin_user} = AdminUserContext.update_admin_user(admin_user, @update_attrs)
      assert %AdminUser{} = admin_user
      assert admin_user.name == "some updated name"
    end

    test "update_admin_user/2 with invalid data returns error changeset" do
      admin_user = admin_user_fixture()
      assert {:error, %Ecto.Changeset{}} = AdminUserContext.update_admin_user(admin_user, @invalid_attrs)
      assert admin_user == AdminUserContext.get_admin_user!(admin_user.id)
    end

    test "delete_admin_user/1 deletes the admin_user" do
      admin_user = admin_user_fixture()
      assert {:ok, %AdminUser{}} = AdminUserContext.delete_admin_user(admin_user)
      assert_raise Ecto.NoResultsError, fn -> AdminUserContext.get_admin_user!(admin_user.id) end
    end

    test "change_admin_user/1 returns a admin_user changeset" do
      admin_user = admin_user_fixture()
      assert %Ecto.Changeset{} = AdminUserContext.change_admin_user(admin_user)
    end
  end
end
