module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        "body-leading-blank": [1, "never"],
        "footer-leading-blank": [1, "never"],
        "header-max-length": [2, "always", 72],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],
        "type-enum": [2, "always", [
            "feat", "build", "fix", "docs", "style", "refactor", "test", "chore", "revert", "sync"
        ]]
    }
}