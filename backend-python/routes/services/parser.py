import ast
import json

def parse_quiz(llm_output: str):
    """
    Extract the first JSON array from llm_output and parse it.
    Returns a list of dicts, each with keys:
      - question
      - choice1
      - choice2
      - choice3
      - choice4
      - answer
    """
    start = llm_output.find('[')
    if start == -1:
        raise ValueError("No JSON array found in LLM output")

    depth = 0
    end = None
    for i, ch in enumerate(llm_output[start:], start):
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        raise ValueError("Could not find matching ']' for JSON array")

    payload = llm_output[start:end]
    try:
        return json.loads(payload)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON payload: {e}")

def parse_test(llm_output: str):
    """
    Extract the first JSON array from llm_output and parse it.
    Returns a Python list of strings.
    """
    start = llm_output.find('[')
    if start == -1:
        raise ValueError("No JSON array found in LLM output")

    # find the matching closing bracket
    depth = 0
    end = None
    for i, ch in enumerate(llm_output[start:], start=start):
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        raise ValueError("Could not find matching ']' for JSON array")

    payload = llm_output[start:end]
    try:
        return json.loads(payload)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON payload: {e}")

def parse_flashcards(llm_output: str):
    """
    Extract the first JSON array from llm_output and parse it.
    Returns a Python list of {"front": "...", "back": "..."} dicts.
    """
    start = llm_output.find('[')
    if start == -1:
        raise ValueError("No JSON array found in LLM output")

    # find matching closing bracket
    depth = 0
    end = None
    for i, ch in enumerate(llm_output[start:], start=start):
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        raise ValueError("Could not find matching ']' for JSON array")

    json_payload = llm_output[start:end]
    try:
        return json.loads(json_payload)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON payload: {e}")
    
def parse_answer(llm_output: str, include_steps: bool):
    start = llm_output.find('{')
    if start == -1:
        raw = llm_output.strip().strip('"').strip("'")
        return {"answer": raw}

    depth = 0
    end = None
    for i, ch in enumerate(llm_output[start:], start):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        raise ValueError("Could not find matching '}' for JSON object")

    payload = llm_output[start:end]
    try:
        data = json.loads(payload)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON payload: {e}")

    if include_steps:
        if "answer" not in data or "steps" not in data:
            raise ValueError("Expected JSON with 'answer' and 'steps'")
        return data
    else:
        return {"answer": str(data.get("answer"))}