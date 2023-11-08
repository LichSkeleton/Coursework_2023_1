import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, e.g., send feedback to the server
        console.log('Feedback submitted:', feedback);
        // You can add an HTTP request here to send the feedback data to your server.
        // Reset the feedback input field
        setFeedback('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="feedback">Відгук:</label>
                <textarea
                    id="feedback"
                    className="form-control"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                    Відправити
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;
