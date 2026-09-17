yo: I know we may not have enough time to manually go through full transcripts and correct everything, so what’s a better way to handle MOM generation?

misspark516: Yes, exactly. We need something that doesn’t just dump raw text but focuses on structured output like key points and decisions.

yo: That makes sense. Maybe instead of processing the entire transcript at once, we can break it down and generate MOM section by section.

misspark516: Right, and I think we should spend more time designing the logic for extracting meaningful insights rather than just summarizing text.

yo: Agreed. We could first extract raw text, then in groups (or steps) process it — like identifying key discussions, action items, and decisions.

yo: Then in the final step, generate a clean and formatted MOM document.

misspark516: I actually wanted to include speaker context first, because that helps in understanding who said what and improves clarity.

misspark516: Also, we can use AI to fill missing details if some sentences are incomplete or unclear.

yo: Yes, that’s a good idea.

misspark516: I also like the idea of breaking the process into stages — extraction, structuring, and formatting.

misspark516: But I’m not sure if the AI will always correctly identify action items or decisions.

yo: Maybe we can define rules or a checklist — like:

Identify sentences with commitments
Detect deadlines or dates
Extract names for responsibility

misspark516: That’s smart. Like checking for:

Action verbs (complete, submit, review)
Time references
Ownership (who is responsible)

yo: Yes, and we can train or guide the model using prompts for better accuracy.

yo: Also, grouping high-confidence outputs with low-confidence ones might help improve results.

misspark516: That sounds like a good approach!

yo: After processing, we can allow users to review and edit the MOM before finalizing.

misspark516: Yes, human validation step is important.

yo: And finally, export the MOM in a clean format like PDF or email-ready document.

misspark516: Perfect, that’s exactly what we need.

