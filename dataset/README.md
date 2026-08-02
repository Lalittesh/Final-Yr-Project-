# Legal Metrology Label Datasets

This folder structure organizes LMPC-compliant and non-compliant package wrapper images for model training/fine-tuning.

## Directory Categories

The folders are organized as follows:

- `biscuits/` - Pre-packaged biscuit wrappers (e.g. Parle-G, Britannia, Marie Gold)
- `soap/` - Bathing soaps and detergent bars (e.g. Dettol, Lux, Dove)
- `shampoo/` - Haircare bottles and sachets (e.g. Clinic Plus, Head & Shoulders)
- `rice/` - Heavy cereal grain packaging bags (e.g. Basmati Rice 5kg/10kg)
- `oil/` - Edible oils and lubricants containers (e.g. Fortune Oil 1L, Hair Oil 100ml)
- `milk/` - Dairy milk pouches and tetra packs (e.g. Amul Milk 500ml)
- `medicine/` - Pharmaceutical cartons and blisters (e.g. Paracetamol strips)
- `toothpaste/` - Dentifrice squeeze tubes (e.g. Colgate, Pepsodent)

## Image Formatting Guidelines

For optimal Grounding DINO and EasyOCR training outcomes:
1. **Resolution**: Minimum 1080p, well-lit, direct-angle captures.
2. **Annotation Format**: Pascal VOC / COCO JSON formats containing bounding box coordinates for MRP, net quantity, manufacturing date, and manufacturer addresses.
3. **Naming Scheme**: `[category]_[status]_[id].jpg` (e.g., `biscuits_compliant_001.jpg` or `shampoo_noncompliant_002.jpg`).
