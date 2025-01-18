import { classNames } from 'primereact/utils';
import KTNDialog from '../../components/basic/KTNDialog';
import InputText from '../../components/basic/ktnTextInput';
import { InputTextarea } from 'primereact/inputtextarea';
import RadioButton from '../../components/basic/ktnRadioButton';
import InputNumber from '../../components/basic/ktnNumberInput';

interface Product {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface EditDialogProps {
  productDialog: boolean;
  productDialogFooter: (hideDialog: any, saveProduct: any) => any;
  hideDialog: () => void;
  saveProduct: () => void;
  product: Product;
  onCategoryChange: any;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => void;
  submitted: boolean;
  onInputNumberChange: any;
}
export const EditDialog: React.FC<EditDialogProps> = ({
  productDialog,
  productDialogFooter,
  hideDialog,
  saveProduct,
  product,
  onCategoryChange,
  onInputChange,
  submitted,
  onInputNumberChange,
}) => {
  return (
    <KTNDialog
      visible={productDialog}
      style={{ width: '450px' }}
      header="Product Details"
      modal
      className="p-fluid"
      footer={productDialogFooter(hideDialog, saveProduct)}
      onHide={hideDialog}
    >
      {product.image && (
        <img
          src={`assets/demo/images/product/${product.image}`}
          alt={product.image}
          width="150"
          className="mt-0 mx-auto mb-5 block shadow-2"
        />
      )}
      <div className="field">
        <label htmlFor="name">Name</label>
        <InputText
          id="name"
          value={product.name}
          onChange={(e: any) => onInputChange(e, 'name')}
          required
          autoFocus
          className={classNames({
            'p-invalid': submitted && !product.name,
          })}
        />
        {submitted && !product.name && (
          <small className="p-invalid">Name is required.</small>
        )}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <InputTextarea
          id="description"
          value={product.description}
          onChange={(e: any) => onInputChange(e, 'description')}
          required
          rows={3}
          cols={20}
        />
      </div>

      <div className="field">
        <label className="mb-3">Category</label>
        <div className="formgrid grid">
          <div className="field-radiobutton col-6">
            <RadioButton
              inputId="category1"
              name="category"
              value="Accessories"
              onChange={onCategoryChange}
              checked={product.category === 'Accessories'}
            />
            <label htmlFor="category1">Accessories</label>
          </div>
          <div className="field-radiobutton col-6">
            <RadioButton
              inputId="category2"
              name="category"
              value="Clothing"
              onChange={onCategoryChange}
              checked={product.category === 'Clothing'}
            />
            <label htmlFor="category2">Clothing</label>
          </div>
          <div className="field-radiobutton col-6">
            <RadioButton
              inputId="category3"
              name="category"
              value="Electronics"
              onChange={onCategoryChange}
              checked={product.category === 'Electronics'}
            />
            <label htmlFor="category3">Electronics</label>
          </div>
          <div className="field-radiobutton col-6">
            <RadioButton
              inputId="category4"
              name="category"
              value="Fitness"
              onChange={onCategoryChange}
              checked={product.category === 'Fitness'}
            />
            <label htmlFor="category4">Fitness</label>
          </div>
        </div>
      </div>

      <div className="formgrid grid">
        <div className="field col">
          <label htmlFor="price">Price</label>
          <InputNumber
            id="price"
            value={product.price}
            onValueChange={(e) => onInputNumberChange(e, 'price')}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div className="field col">
          <label htmlFor="quantity">Quantity</label>
          <InputNumber
            id="quantity"
            value={product.quantity}
            onValueChange={(e) => onInputNumberChange(e, 'quantity')}
          />
        </div>
      </div>
    </KTNDialog>
  );
};
