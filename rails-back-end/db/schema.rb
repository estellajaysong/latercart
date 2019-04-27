# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wishlists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_wishlists", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "wishlist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_wishlists", ["user_id"], name: "index_user_wishlists_on_user_id", using: :btree
  add_index "user_wishlists", ["wishlist_id"], name: "index_user_wishlists_on_wishlist_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.string   "price"
    t.string   "img_url"
    t.string   "rating"
    t.text     "note"
    t.integer  "wishlist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "products", ["wishlist_id"], name: "index_products_on_wishlist_id", using: :btree

  create_table "category_products", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "category_products", ["category_id"], name: "index_category_products_on_category_id", using: :btree
  add_index "category_products", ["product_id"], name: "index_category_products_on_products_id", using: :btree

  create_table "site_selectors", force: :cascade do |t|
    t.string   "site_name"
    t.string   "title_tag"
    t.string   "price_tag"
    t.string   "img_tag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "user_wishlists", "users"
  add_foreign_key "user_wishlists", "wishlists"
  add_foreign_key "products", "wishlists"
  add_foreign_key "category_products", "categories"
  add_foreign_key "category_products", "products"

end
