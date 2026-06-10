from decimal import Decimal

from django.db import migrations


CATALOG = {
    "Electronics": [
        ("Samsung Galaxy S25", "Flagship Android smartphone with a vivid display, fast performance, and pro-grade cameras.", "84999.00", 25, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80"),
        ("iPhone 16", "Premium smartphone with a refined camera system, smooth performance, and long battery life.", "89999.00", 22, "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=80"),
        ("OnePlus 14", "High-performance smartphone with rapid charging, a sharp display, and clean everyday usability.", "64999.00", 28, "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80"),
        ("Smart Watch", "Fitness and notification smartwatch with health tracking, activity modes, and all-day comfort.", "7999.00", 16, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"),
        ("Wireless Earbuds", "Compact true wireless earbuds with clear audio, noise isolation, and charging case.", "3499.00", 35, "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80"),
    ],
    "Computer Accessories": [
        ("Mechanical Keyboard", "Tactile mechanical keyboard with durable switches, backlighting, and comfortable typing feel.", "4999.00", 18, "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80"),
        ("Wireless Mouse", "Ergonomic wireless mouse with precise tracking and reliable battery life.", "1299.00", 30, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80"),
        ("Monitor", "Full HD monitor with slim bezels, crisp colors, and comfortable viewing for work or study.", "12999.00", 14, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80"),
        ("SSD", "Fast solid-state drive for quicker boot times, file transfers, and application loading.", "4299.00", 26, "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80"),
        ("Webcam", "HD webcam with built-in microphone for meetings, classes, and video calls.", "2499.00", 20, "https://images.unsplash.com/photo-1623949556303-b0d17d198863?auto=format&fit=crop&w=900&q=80"),
    ],
    "Office Supplies": [
        ("Notebook", "Ruled notebook for daily notes, planning, journaling, and office work.", "149.00", 80, "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=900&q=80"),
        ("Pens", "Smooth writing pen set for office, school, and everyday use.", "99.00", 120, "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=900&q=80"),
        ("Calculator", "Reliable desktop calculator with clear display and practical business functions.", "599.00", 32, "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?auto=format&fit=crop&w=900&q=80"),
        ("Files", "Durable document files for organizing reports, invoices, and records.", "249.00", 60, "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=900&q=80"),
        ("Markers", "Bright marker set for whiteboards, planning boards, and presentations.", "199.00", 70, "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80"),
    ],
    "Furniture": [
        ("Office Chair", "Adjustable office chair with supportive backrest and cushioned seating.", "8999.00", 12, "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80"),
        ("Study Table", "Compact study table with sturdy build and practical surface space.", "6999.00", 11, "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80"),
        ("Bookshelf", "Multi-tier bookshelf for books, files, decor, and storage organization.", "5499.00", 9, "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80"),
    ],
    "Home Appliances": [
        ("Air Conditioner", "Energy-efficient air conditioner for fast cooling and comfortable room temperature.", "35999.00", 10, "https://images.unsplash.com/photo-1624573988821-3ac92223d9ef?auto=format&fit=crop&w=900&q=80"),
        ("Refrigerator", "Spacious refrigerator with efficient cooling and organized food storage.", "29999.00", 13, "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80"),
        ("Microwave Oven", "Countertop microwave oven for reheating, cooking, and quick meals.", "9999.00", 15, "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=900&q=80"),
    ],
}


def seed_catalog(apps, schema_editor):
    Category = apps.get_model("products", "Category")
    Product = apps.get_model("products", "Product")
    Supplier = apps.get_model("suppliers", "Supplier")
    User = apps.get_model("users", "User")

    user, _ = User.objects.get_or_create(
        username="catalog_admin",
        defaults={
            "email": "catalog-admin@example.com",
            "password": "catalog-admin",
            "role": "admin",
        },
    )

    supplier, _ = Supplier.objects.get_or_create(
        supplier_name="IMS Sample Supplier",
        defaults={
            "email": "supplier@example.com",
            "phone": "9999999999",
            "address": "Sample warehouse",
        },
    )

    for category_name, products in CATALOG.items():
        category, _ = Category.objects.get_or_create(
            category_name=category_name,
            defaults={"description": f"{category_name} products for the user catalog."},
        )

        for index, (name, description, price, stock, image_url) in enumerate(products, start=1):
            barcode = f"IMS-{category_name[:3].upper()}-{index:03d}"
            Product.objects.update_or_create(
                barcode=barcode,
                defaults={
                    "product_name": name,
                    "description": description,
                    "image_url": image_url,
                    "price": Decimal(price),
                    "stock": stock,
                    "category": category,
                    "supplier": supplier,
                    "created_by": user,
                },
            )


def remove_catalog(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    Product.objects.filter(barcode__startswith="IMS-").delete()


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_product_image_url"),
    ]

    operations = [
        migrations.RunPython(seed_catalog, remove_catalog),
    ]
