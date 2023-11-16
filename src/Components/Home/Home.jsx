    import React, { useContext, useEffect, useState } from "react";
    import styles from './Home.module.css';
    import { useFormik } from "formik";
    import { toast } from "react-toastify";
    import Swal from 'sweetalert2'
    import * as Yup from 'yup';
    import { AmountContext } from "../../TrackerContext/AmountContext";

    export default function Home(){

        let {storedData, setStoredData} = useContext(AmountContext);

        const [editingIndex, setEditingIndex] = useState(null);

        useEffect(() => {  
        }, []);
        const showDescription = (getParagrapgh)=>{
            Swal.fire(getParagrapgh);
        }
        const handleTypeChange = (event) => {
            formik.setFieldValue('type', event.target.value);
        };
        const onSubmit = (values) => {
            if (editingIndex !== null) {
            const updatedData = [...storedData];
            updatedData[editingIndex] = values;
            setStoredData(updatedData);
            setEditingIndex(null);
            document.getElementById('addButton').innerText = "Add";
            toast.success('Record updated successfully!');
            } else {
            setStoredData([...storedData, values]);
            toast.success('Record added successfully!');
            }
            localStorage.setItem("allRecords", JSON.stringify([...storedData , values]));
            formik.resetForm();
        };
        //Handle Yup for fomik validation
        const validationSchema = Yup.object({
            amount: Yup.number().positive('Amount must be a positive number').required('Amount is required'),
            category: Yup.string().required('Category is required'),
            date: Yup.date().required('Date is required'),
            description: Yup.string().required('Description is required'),
            type: Yup.string().required('Type is required'),
        });
        // Handle delete function for each record
        const handleDelete = (indexNumber)=>{

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    const newStoredData = [...storedData];
                    newStoredData.splice(indexNumber, 1);
                    setStoredData(newStoredData);
                    localStorage.setItem("allRecords", JSON.stringify(newStoredData));
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your record has been deleted.",
                    icon: "success"
                  });
                }
              });
        }
        // Handle Modify function for each record
        const handleModify = (indexNumber) => {
            setEditingIndex(indexNumber);
            formik.setValues(storedData[indexNumber]);
            document.getElementById('addButton').innerText ="Update";
            localStorage.setItem("allRecords", JSON.stringify(storedData));
        };
        // choose 1 for all records , 2 for only income and 3 for only expenses
        const dsiplayRecords = (typeNumber) => {
            let showData = [...storedData]
            if (typeNumber === 2) {
                showData = showData.filter((record) => record.type === 'income');
            } else if (typeNumber === 3) {
                showData = showData.filter((record) => record.type === 'expense');
            }
            return showData.map((record, index) => (
                <div className="row px-4 py-2" key={`R${index}`}>
                    <div className="col-md-2 text-center">
                        <p className="mb-0">{record.amount}<span className="fw-bold fs-6 ps-1 text-success">$</span></p>
                    </div>
                    <div className="col-md-2 text-center">
                        <p className="mb-0">{record.category}</p>
                    </div>
                    <div className="col-md-2 text-center">
                        <p className="mb-0">{record.date}</p>
                    </div>
                    <div className="col-md-2 text-center">
                        <p className="mb-0 clickable" onClick={() => showDescription(record.description)}>{record.description.split(' ').slice(0, 8).join(' ') + '...'}</p>
                    </div>
                    <div className="col-md-2 text-center">
                        <button onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button>
                    </div>
                    <div className="col-md-2 text-center">
                        <button onClick={() => handleModify(index)} className="btn btn-orange">Modify</button>
                    </div>
                </div>
            ));
        };
        
        const formik = useFormik({
            initialValues:{
                amount: '',
                category: '',
                date:'',
                description:'',
                type:'income',
            },
            validationSchema,
            onSubmit,
        });
        return (
        <>
            {/* Input form to get data from user */}
            <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-md-2">
                <input
                    className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.amount && formik.errors.amount ? (
                        <div className="invalid-feedback">{formik.errors.amount}</div>
                    ) : null}
                </div>
                <div className="col-md-2">
                <input
                    className={`form-control ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                    type="text"
                    name="category"
                    id="category"
                    placeholder="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.category && formik.errors.category ? (
                        <div className="invalid-feedback">{formik.errors.category}</div>
                    ) : null}
                </div>
                <div className="col-md-2">
                <input
                    className={`form-control ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                        <div className="invalid-feedback">{formik.errors.date}</div>
                    ) : null}
                </div>
                <div className="col-md-3">
                <textarea
                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    rows={1}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                        <div className="invalid-feedback">{formik.errors.description}</div>
                    ) : null}
                </div>
                <div className="col">
                <button type="submit" id="addButton" className="w-100 btn btn-main">
                    Add
                </button>
                </div>
                <div className="col">
                <select className="w-100 btn btn-orange" value={formik.values.type} onChange={handleTypeChange}>
                    <option disabled defaultValue value="" >
                    Choose...
                    </option>
                    <option className="p-2"  name="income" value="income">
                    Income
                    </option>
                    <option name="expense" value="expense">
                        Expense
                    </option>
                </select>
                </div>
            </div>
            </form>
            <hr />
            {/* Choose between show all , only income or only expenses */}
            <div className="row my-3">
            <div className="col-md-2 d-flex align-items-center">
                <h4 className="h5 text-main">What type to show? </h4>
            </div>
            <div className="col-md-3">
                <ul className="nav nav-pills" id="typeSwiper" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="all-records" data-bs-toggle="tab" data-bs-target="#all-records-pane" type="button" role="tab" aria-controls="all-records-pane" aria-selected="true" >
                    All
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="income-records" data-bs-toggle="tab" data-bs-target="#income-records-pane" type="button" role="tab" aria-controls="income-records-pane" aria-selected="false" >
                    Incomes
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="expenses-records" data-bs-toggle="tab" data-bs-target="#expenses-records-pane" type="button" role="tab" aria-controls="expenses-records-pane" aria-selected="false">
                    Expenses
                    </button>
                </li>
                </ul>
            </div>
            </div>
            {/* Show the records */}
            {/* The head */}
            <div className="row bg-main p-4 text-white rounded text-center">
            <div className="col-md-2">
                <h3 className="h6 mb-0">Amount</h3>
            </div>
            <div className="col-md-2">
                <h3 className="h6 mb-0">Category</h3>
            </div>
            <div className="col-md-2">
                <h3 className="h6 mb-0">Date</h3>
            </div>
            <div className="col-md-2">
                <h3 className="h6 mb-0">Description</h3>
            </div>
            <div className="col-md-2 ">
                <h3 className="h6 mb-0">Delete</h3>
            </div>
            <div className="col-md-2 ">
                <h3 className="h6 mb-0">Modify</h3>
            </div>
            </div>
            {/* The Body */}
            <div className="row mt-3">
                <div className="tab-content" id="typeSwiperContent">
                    <div className="tab-pane fade show active" id="all-records-pane" role="tabpanel" aria-labelledby="all-records" tabIndex="0">
                        {storedData ? dsiplayRecords(1) : null}
                    </div>
                    <div className="tab-pane fade" id="income-records-pane" role="tabpanel" aria-labelledby="income-records" tabIndex="0">
                        {storedData ? dsiplayRecords(2) : null}
                    </div>
                    <div className="tab-pane fade" id="expenses-records-pane" role="tabpanel" aria-labelledby="expenses-records" tabIndex="0">
                        {storedData ? dsiplayRecords(3) : null}
                    </div>
                </div>
            </div>
        </>
        );
    } 