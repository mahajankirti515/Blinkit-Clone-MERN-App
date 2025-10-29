import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: String,
    required: [true, "provide orderId"],
    unique: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  product_details: {
    name:String,
    image:Array
  },
  paymentId: {
    type: String,
    default:""
  },
  payment_status: {
    type: String,
    default:""
  },
  delivery_address: {
    type: mongoose.Schema.ObjectId,
    ref:"Address",
  },
  totalAmount: {
    type:Number,
    default:0
  },
  subTotalAmount: {
    type:Number,
    default:0
  },
  invoice_receipt: {
    type: String,
    default:""
  },
},{
    timestamps: true
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
