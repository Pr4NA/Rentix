import './reviews.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Reviews() {
  return (
    <div className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>
      <div className="reviews-underline">
        <span className="pink" />
        <span className="yellow" />
      </div>
      <p className="reviews-subtitle">Don't just take our word for it - hear from our satisfied customers</p>

      <div className="reviews-container">
        <div className="review-card">
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p>
            <i>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, alias saepe? Praesentium repudiandae laudantium nesciunt ipsam iure maiores voluptate? Neque, vitae iusto, rem impedit magnam nemo eius perspiciatis odio, dignissimos deserunt eum ex quibusdam eligendi incidunt maiores nulla iste consectetur doloribus! Itaque aut reiciendis error."
            </i>
            <h3>- Devesh Tomar</h3>
          </p>
        </div>

        <div className="review-card">
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p>
            <i>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est facilis commodi reiciendis, iure culpa impedit tenetur quae a aspernatur, ea sunt fugit officia ut! Qui rem, est ipsam commodi magni dicta? Laboriosam, officia asperiores! Officiis doloremque voluptatem ducimus quam quibusdam expedita tempora neque repudiandae incidunt eaque saepe, qui sunt commodi."
            </i>
            <h3>- Jatin Jorwal</h3>
          </p>
        </div>

        <div className="review-card">
          <div className="stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
          </div>
          <p>
            <i>
               "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo blanditiis et ipsam in, quaerat optio accusantium eos, sequi obcaecati at perspiciatis laudantium ea impedit nam minima totam, nihil aspernatur mollitia. Ea repudiandae voluptatem, sapiente, dolorem alias veritatis eius voluptate est, illum tempore fuga. Vitae quisquam minus amet repellendus, ducimus ad necessitatibus laborum sunt quam!"
            </i>
            <h3>- Hemant Kumar</h3>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
